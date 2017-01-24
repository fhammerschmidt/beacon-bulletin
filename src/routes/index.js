// @flow
export type Route = {
  key: string,
  title: string,
  showBackButton: boolean,
};

export const HomeRoute: Route = {
  key: 'new',
  title: 'Main Screen',
  showBackButton: true,
};

export function RoomDetailRoute(id: string): Route {
  return {
    key: 'room',
    title: `Room ${id}`,
    showBackButton: true,
  };
}
