export default function LoadingCards() {
  const cardList = [0, 1, 2, 3, 4, 5];

  const loadingCards = cardList.map((card, i) => (
    <li key={i + 1} className="place__card place__loading skeleton"></li>
  ));

  return <ul className="place">{loadingCards}</ul>;
}
