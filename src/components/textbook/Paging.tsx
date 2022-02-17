import styled from 'styled-components'

interface IPaging {
  current: number
  total: number
  callback: (num: number) => void
}

type ButtonStateType = 'disabled' | 'current' | 'page' | 'skip' | 'studied'

enum LABEL {
  PREV = '<',
  NEXT = '>',
  SKIP = '...',
}

const PagingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`

const PagingButton = styled.button<{ buttonState: ButtonStateType }>`
  width: 22px;
  height: 22px;
  display: inline-flex;
  justify-content: center;
  border: none;
  border-radius: 12px;
  margin: 0 4px;
  color: ${(props) => {
    return props.buttonState === 'skip' ? '#fff;' : '#030303;'
  }};
  background-color: ${(props) => {
    let res = ''
    switch (props.buttonState) {
      case 'current':
        res = '#b3065c;'
        break
      case 'disabled':
        res = '#555;'
        break
      case 'studied':
        res = '#366a89;'
        break
      case 'skip':
        res = 'transparent;'
        break
      default:
        res = '#fff'
        break
    }
    return res
  }};
  opacity: ${(props) => (props.buttonState === 'page' ? '0.7;' : '1;')};
  font-size: 14px;
  line-height: 22px;
  font-weight: bold;
  transition: all ease 0.3s;
  cursor: pointer;
  pointer-events: ${(props) =>
    props.buttonState === 'page' ? 'auto;' : 'none;'};
  &:hover {
    opacity: 1;
  }
  &:active {
    background-color: #b3065c;
  }
`

const createPaging = (
  current: number,
  total: number,
  countButton?: number
): Array<string> => {
  const half = countButton && countButton >= 9 ? (countButton - 7) / 2 : 2
  const count = countButton || 11
  const maxButtons = total <= count - half ? total + half : count

  const arr = new Array<string>(maxButtons).fill('')

  let ind = 1
  arr[0] = LABEL.PREV
  for (let i = 1; i < maxButtons - 1; i += 1) {
    if (
      current - half > 3 &&
      current + half < total - 2 &&
      total > maxButtons - 2
    ) {
      if (i === 1) {
        arr[i] = '1'
        ind = -half
      } else if (i === 2 || i === maxButtons - 3) arr[i] = LABEL.SKIP
      else if (i === maxButtons - 2) arr[i] = total.toString()
      else if (i > 2 && i < maxButtons - 3) {
        arr[i] = (current + ind).toString()
        ind += 1
      }
    } else if (
      current - half <= 3 &&
      current + half < total - 2 &&
      total > maxButtons - 2
    ) {
      if (i <= maxButtons - 4) arr[i] = i.toString()
      else if (i === maxButtons - 3) arr[i] = LABEL.SKIP
      else if (i === maxButtons - 2) arr[i] = total.toString()
    } else if (
      current - half > 3 &&
      current + half >= total - 2 &&
      total > maxButtons - 2
    ) {
      if (i === 1) {
        arr[i] = '1'
        ind = maxButtons - 4
      } else if (i === 2) arr[i] = LABEL.SKIP
      else if (i === maxButtons - 2) arr[i] = total.toString()
      else {
        arr[i] = (total - ind + 1).toString()
        ind -= 1
      }
    } else {
      arr[i] = i.toString()
    }
  }
  arr[maxButtons - 1] = LABEL.NEXT
  return arr
}

export const Paging = ({ current, total, callback }: IPaging) => {
  const pagingListener = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const page = e.currentTarget.dataset.prop || ''
    if (page === LABEL.PREV) callback(current - 1)
    else if (page === LABEL.NEXT) callback(current + 1)
    else callback(+page)
  }

  return (
    <PagingContainer>
      {createPaging(current, total, 11).map((page, ind) => {
        return (
          <PagingButton
            key={page + ind.toString()}
            data-prop={page}
            buttonState={((): ButtonStateType => {
              if (+page === current) return 'current'
              if (current === 1 && page === LABEL.PREV) return 'disabled'
              if (current === total && page === LABEL.NEXT) return 'disabled'
              if (page === LABEL.SKIP) return 'skip'
              return 'page'
            })()}
            disabled={
              +page === current ||
              (current === 1 && page === LABEL.PREV) ||
              (current === total && page === LABEL.NEXT) ||
              page === LABEL.SKIP
            }
            type="button"
            onClick={pagingListener}
          >
            {page}
          </PagingButton>
        )
      })}
    </PagingContainer>
  )
}
