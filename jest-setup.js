// Mock the wasm module
jest.mock('$lib/wasm_bridge', () => ({
  __esModule: true,
  init: jest.fn().mockResolvedValue(null),
  apply_filter: jest.fn((filterName, data) => {
    // Return a modified copy to simulate a filter effect
    const newData = new Uint8ClampedArray(data);
    for (let i = 0; i < newData.length; i += 4) {
      newData[i] = 255 - newData[i]; // Invert colors for mock
      newData[i + 1] = 255 - newData[i + 1];
      newData[i + 2] = 255 - newData[i + 2];
    }
    return Promise.resolve(newData);
  }),
}));
