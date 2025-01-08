export interface OpenControl<X> {
  //test control
  openMockApp(targetApp: any, context?: any): void;
  closeMockApp(testId: string): Promise<void>;

  createTargetApp(name?: string, appId?:string): any;

  //listening
  contextReceiver(contextType: string, expectNotToReceiveContext?: boolean): Promise<X>;
  addListenerAndFailIfReceived(): Promise<void>;

  //validation
  confirmAppNotFoundErrorReceived(exception: DOMException): void;
  validateReceivedContext(contextReceiver: X, expectedContextType: string): Promise<void>;
  expectAppTimeoutErrorOnOpen(appId: string): Promise<void>;
}

export const openApp = {
  a: {
    name: "IntentAppA",
    id: "IntentAppAId@localhost",
  },
  b: {
    name: "MockApp",
    id: "MockAppId@localhost",
  },
  c: {
    name: "IntentAppC",
    id: "IntentAppCId@localhost",
  },
  d: {
    id: "OpenAppAId@localhost",
  },
  e: {
    id: "OpenAppBId@localhost",
  },
  f: {
    name: "IntentAppB",
    id: "IntentAppBId@localhost",
  },
};

export type OpenCommonConfig = {
  fdc3Version: string;
  prefix: string;
  target: string;
  targetMultiple: string;
};
