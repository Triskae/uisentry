export abstract class NotificationProvider<T> {
  public type: NotificationProviderType;
  public providerConfig: T;

  protected constructor(
    protected config: T,
    type: NotificationProviderType,
  ) {
    this.providerConfig = config;
    this.type = type;
  }

  abstract sendNotification(message: string, image?: string): Promise<number>;
}

export enum NotificationProviderType {
  TELEGRAM = 'telegram',
  SIGNAL = 'signal',
}
