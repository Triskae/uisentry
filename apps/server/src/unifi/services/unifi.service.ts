import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UnifiResponse } from '../models/unifi-response';
import { lastValueFrom } from 'rxjs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UnifiCartResponse, UnifiLimitationCode } from '../models/unifi-cart-response';
import { Region } from '@unifi-monitor/shared/interfaces';

export const UNIFI_URL = 'https://ecomm.svc.ui.com/graphql';

@Injectable()
export class UnifiService {
  constructor(private readonly httpService: HttpService) {}

  async getAllUnifiProducts(store: Region): Promise<UnifiResponse | undefined> {
    const requestBody = {
      operationName: 'GetProductsForLandingPagePro',
      variables: {
        input: {
          limit: 250,
          offset: 0,
          filter: {
            storeId: store,
            language: 'en',
            line: 'Unifi'
          }
        }
      },
      query: `query GetProductsForLandingPagePro($input: StorefrontProductListInput!) {
      storefrontProducts(input: $input) {
        pagination {
          limit
          offset
          total
          __typename
        }
        items {
          ...LandingProProductFragment
          __typename
        }
        __typename
      }
    }

    fragment LandingProProductFragment on StorefrontProduct {
      id
      title
      shortTitle
      name
      slug
      collectionSlug
      organizationalCollectionSlug
      shortDescription
      tags {
        name
        __typename
      }
      gallery {
        ...ImageOnlyGalleryFragment
        __typename
      }
      options {
        id
        title
        values {
          id
          title
          __typename
        }
        __typename
      }
      variants {
        id
        sku
        status
        title
        galleryItemIds
        isEarlyAccess
        optionValueIds
        displayPrice {
          ...MoneyFragment
          __typename
        }
        hasPurchaseHistory
        __typename
      }
      __typename
    }

    fragment ImageOnlyGalleryFragment on Gallery {
      id
      items {
        id
        data {
          __typename
          ... on Asset {
            id
            mimeType
            url
            height
            width
            __typename
          }
        }
        __typename
      }
      type
      __typename
    }

    fragment MoneyFragment on Money {
      amount
      currency
      __typename
    }`
    };

    try {
      const a = await lastValueFrom(
        this.httpService.post<UnifiResponse>(UNIFI_URL, requestBody, {
          headers: {
            'Content-Type': 'application/json'
          },
          responseType: 'json'
        })
      );
      return a.data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async getStockForProducts(store: Region, variants: string[]): Promise<UnifiCartResponse | undefined> {
    const requestBody = {
      operationName: 'ValidateCart',
      variables: {
        storeId: store,
        items: [
          ...variants.map((id) => {
            return {
              storeProductVariantId: id,
              quantity: 100000
            };
          })
        ]
      },
      query: `query ValidateCart($storeId: StoreId!, $items: [CartItem!]!, $checkoutId: UUID) {  validateCart(storeId: $storeId, items: $items, checkoutId: $checkoutId)}`
    };

    try {
      const a = await lastValueFrom(
        this.httpService.post<UnifiCartResponse>(UNIFI_URL, requestBody, {
          headers: {
            'Content-Type': 'application/json'
          },
          responseType: 'json'
        })
      );
      return a.data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async checkForStock(): Promise<void> {
    const allProducts = await this.getAllUnifiProducts(Region.Europe);

    const allVariantIds: string[] = [];

    for (const product of allProducts?.data.storefrontProducts.items || []) {
      allVariantIds.push(...product.variants.map((variant) => variant.id));
    }

    if (allVariantIds.length) {
      const allVariantsStock = await this.getStockForProducts(Region.Europe, allVariantIds);
      const error = allVariantsStock?.errors.find(
        (error) => error.extensions.code === UnifiLimitationCode.LIMITATION_ERROR
      );
      const stockQuantity = error?.extensions.limitationReasons[0].quantityAllowed;
    }
  }
}

// Pour savoir quand envoyer la notif de remise en stock
// Au moment ou on sait quels sont les produits qui sont en stock, on récupe leurs id, et on fait un select en base pour savoir quels produits on un stock de 0 et qui on un id dans la liste des produits en stock.
