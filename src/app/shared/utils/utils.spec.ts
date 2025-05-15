import { pluck, range } from './utils';
describe('utils', () => {
  describe('range', () => {
    it('Deve retornar a faixa de 1 a 5', () => {
      expect(range(1, 5)).toEqual([1, 2, 3, 4]);
    });

    it('Deve retornar a faixa de 41 a 45', () => {
      expect(range(41, 44)).toEqual([41, 42, 43]);
    });
  });

  describe('plunk', () => {
    it('Deve retornar os elementos corretamente', () => {
      const elements = [
        { id: 1, name: 'Lucas' },
        { id: 2, name: 'João' },
        { id: 3, name: 'Maria' },
      ];
      expect(pluck(elements, 'id')).toEqual([1, 2, 3]);
      expect(pluck(elements, 'name')).toEqual(['Lucas', 'João', 'Maria']);
      expect(elements.length).toEqual(3);
    });
  });
});
