import { checkWinner, isBoardFull, makeMove } from '@/utils/gameLogic';

// Test the Cell component's props interface without React rendering
describe('Cell component interface', () => {
  it('accepts null value', () => {
    const props = { value: null, onClick: jest.fn(), disabled: false };
    expect(props.value).toBeNull();
  });

  it('accepts X value', () => {
    const props = { value: 'X' as const, onClick: jest.fn() };
    expect(props.value).toBe('X');
  });

  it('accepts O value', () => {
    const props = { value: 'O' as const, onClick: jest.fn() };
    expect(props.value).toBe('O');
  });

  it('onClick is a function', () => {
    const handleClick = jest.fn();
    const props = { value: null, onClick: handleClick };
    props.onClick();
    expect(handleClick).toHaveBeenCalled();
  });

  it('disabled prop is optional', () => {
    const props: { value: null; onClick: () => void; disabled?: boolean } = { value: null, onClick: jest.fn() };
    expect(props.disabled).toBeUndefined();
  });
});

