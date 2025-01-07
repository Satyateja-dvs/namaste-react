const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {
        Array.from({length: 15}).map((_, index) => (
          <div className="shimmer-card" key={index}></div>
        ))
      }
    </div>
  )
}

export default Shimmer;