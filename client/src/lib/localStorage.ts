export interface StoredCycleData {
  cycleDuration: number;
  periodDuration: number;
  lastPeriodDate: string;
}

const CYCLE_DATA_KEY = 'cycleData';

export function saveCycleData(data: StoredCycleData): void {
  try {
    localStorage.setItem(CYCLE_DATA_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving cycle data:', error);
  }
}

export function loadCycleData(): StoredCycleData | null {
  try {
    const data = localStorage.getItem(CYCLE_DATA_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading cycle data:', error);
    return null;
  }
}

export function hasCycleData(): boolean {
  return loadCycleData() !== null;
}

export function clearCycleData(): void {
  try {
    localStorage.removeItem(CYCLE_DATA_KEY);
  } catch (error) {
    console.error('Error clearing cycle data:', error);
  }
}
