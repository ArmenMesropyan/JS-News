class LoginNotifyUI {
    constructor() {
        this.count = 0;
        this.container = null;
    }

    showNotify() {
        if (this.count) return;
        document.body.insertAdjacentHTML('afterbegin', `
            <section class="news__recomendation news-recomendation cancel">
                <div class="news-recomendation__card card blue-grey">
                    <div class="news-recomendation__text card-content white-text">
                        <h2 class="card-title">
                            <i class="fas fa-hand-sparkles"></i> Hi! Your country doesn't supported!
                        </h2>
                        <p>
                            If you want to choose your default country or like your lovely news this information for you! We want to suggest you join us. Just registrate!
                        </p>
                    </div>
                    <div class="news-recomendation__actions card-action">
                        <button class="news-recomendation__registrate waves-effect waves-light btn registrate">Registrate!</button>
                        <button class="news-recomendation__close waves-effect waves-light btn red cancel">Sorry, but it's not for me.</button>
                    </div>
                </div>
            </section>
        `);
        this.container = document.querySelector('.news-recomendation');
        this.count++;
    }

    generateNotify(registrate) {
        this.container.addEventListener('click', ({ target }) => {
            const isRegistrate = target.classList.contains('registrate');
            const isCancel = target.classList.contains('cancel');
            if (isRegistrate) registrate();
            else if (isCancel) this.clearNotify();
        });
    }

    clearNotify() {
        this.container.remove();
    }
}

const loginNotifyUI = new LoginNotifyUI();

export default loginNotifyUI;