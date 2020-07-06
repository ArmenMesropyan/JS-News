export default function generateBack(cb) {
    const button = document.querySelector('.news-list__back');
    button.addEventListener('click', () => cb());
}