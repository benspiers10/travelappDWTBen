export type Trip = {
  id: string;

  // Optional title that the user can edit later.
  title?: string;

  startPhoto: string | null;
  endPhoto: string | null;

  startTime: string | null;
  endTime: string | null;

  startLatitude: number | null;
  startLongitude: number | null;
  endLatitude: number | null;
  endLongitude: number | null;

  startCity?: string | null;
  endCity?: string | null;

  status: 'completed';
};