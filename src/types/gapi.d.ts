declare namespace gapi {
  namespace client {
    function init(config: {
      apiKey: string;
      discoveryDocs: string[];
    }): Promise<void>;

    namespace calendar {
      namespace events {
        function list(params: {
          calendarId: string;
          timeMin?: string;
          timeMax?: string;
          showDeleted?: boolean;
          singleEvents?: boolean;
          maxResults?: number;
          orderBy?: string;
        }): Promise<{ result: { items?: Event[] } }>;
      }
      interface Event {
        id?: string;
        summary?: string;
        description?: string;
        location?: string;
        status?: string;
        creator?: { email?: string };
        start?: { dateTime?: string; date?: string };
        end?: { dateTime?: string; date?: string };
      }
    }
  }
  function load(api: string, callback: () => void): void;
}
