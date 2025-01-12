export async function createCards() {
  const response = await fetch('../scripts/cards.json');
  const cardsData = await response.json();

  const container = document.getElementById('cards-container');
  const template = document.getElementById('card-template').content;

  cardsData.forEach(card => {
    const cardElement = template.cloneNode(true);
    const link = cardElement.querySelector('.card-link');
    const img = cardElement.querySelector('.card-image');
    const title = cardElement.querySelector('.card-title');

    link.href = card.url;
    img.src = card.imageUrl;
    img.alt = `Карточка`;
    title.textContent = card.title;

    container.appendChild(cardElement);
  });
}
