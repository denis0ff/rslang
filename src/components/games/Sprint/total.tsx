interface ScoreProps {
  coefficient: number
  total: number
  anser: boolean
}
const Score = (props: ScoreProps) => {
  const { coefficient = 1, total = 0, anser } = props
  return (
    <div className="score-wrapper">
      <div
        className={
          anser
            ? 'score-calculate anser-right'
            : 'score-calculate anser-negative'
        }
      >
        <span>Умножение:</span>
        <span> x {coefficient}</span>
        <span>+{10 * coefficient}</span>
      </div>
      <div className="score-total">
        <span>очки:</span>
        <span>{total}</span>
      </div>
    </div>
  )
}
export default Score
