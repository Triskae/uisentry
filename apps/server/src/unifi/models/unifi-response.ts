export interface UnifiResponse {
  data: {
    storefrontProducts: {
      pagination: {
        limit: number;
        offset: number;
        total: number;
        __typename: 'PaginationResponse';
      };
      items: UnifiProduct[];
      __typename: string;
    };
  };
}

export interface UnifiProduct {
  id: string;
  title: string;
  shortTitle: string;
  name: string;
  slug: string;
  collectionSlug: string;
  organizationalCollectionSlug?: string;
  shortDescription: string;
  tags: UnifiTag[];
  gallery: UnifiGallery;
  options: UnifiOption[];
  variants: UnifiVariant[];
  __typename: 'StorefrontProduct';
}

export interface UnifiTag {
  name: string;
  __typename: 'ProductTag';
}

export interface UnifiGallery {
  id: string;
  type: string;
  __typename: 'Gallery';
  items: UnifiGalleryItem[];
}

export interface UnifiOption {
  id: string;
  title: string;
  values: UnifiOptionValue[];
  __typename: string;
}

export interface UnifiOptionValue {
  id: string;
  title: string;
  __typename: string;
}

export interface UnifiVariant {
  id: string;
  sku: string;
  status: UnifiStatus;
  title: string;
  galleryItemIds: string[];
  isEarlyAccess: boolean;
  optionValueIds: string[];
  displayPrice: UnifiMoney;
  hasPurchaseHistory: boolean;
  __typename: string;
}

export enum UnifiStatus {
  Available = 'Available',
  SoldOut = 'SoldOut'
}

export interface UnifiMoney {
  amount: number;
  currency: string;
  __typename: 'Money';
}

export interface UnifiGalleryItem {
  id: string;
  __typename: 'GalleryItem';
  data: {
    __typename: 'Asset';
    id: string;
    mimeType: string;
    url: string;
    height: number;
    width: number;
  };
}
