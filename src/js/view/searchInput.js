export default function generateInput() {
    const firstOverlay = document.querySelector('.search__overlay--first');
    const secondOverlay = document.querySelector('.search__overlay--second');
    const search = document.querySelector('.search');
    const input = document.querySelector('.search__input');

    firstOverlay.addEventListener('click', () => {
        search.classList.toggle('active');
        if (!search.classList.contains('active')) return;

        setTimeout(() => {
            input.focus();
        }, 200);
    });
    search.addEventListener('click', () => {
        if (!search.classList.contains('active')) return;

        setTimeout(() => {
            input.focus();
        }, 200);
    });
    secondOverlay.addEventListener('click', () => {
        input.value = '';
        input.focus();
        search.classList.remove('searching');
    });
    document.body.addEventListener('click', (e) => {
        if (search.contains(e.target) && input.value.length === 0) return;

        search.classList.remove('active');
        search.classList.remove('searching');
        input.value = '';
    });
    input.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) input.blur();
    });
    input.addEventListener('input', () => {
        if (input.value.length > 0) search.classList.add('searching');
        else search.classList.remove('searching');
    });

    input.value = '';
    input.blur();

    return input;
}