export class MenuItem {
  constructor(public title: string, public id: string) { }
}

export type Langs = string[];

export class ServerError {
  constructor(public message: string) {}
}

export const RoutesNames = {
  ERROR: 'error',
};

export class ErrorData {
  constructor(public serverData: ServerError,
              public status: number,
              public statusText: string) {}
}
