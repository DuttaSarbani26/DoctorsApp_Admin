
  interface Location {
    id: string;
    name: string;
  }

  interface LocationState {
    loading: boolean;
    data: Location | null;
    error: any;
  }
