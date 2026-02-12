const saveData = () => {
    const checkboxes = document.querySelectorAll('.target');
    const states = Array.from(checkboxes).map(cb => cb.checked);
    localStorage.setItem('nyankoCheckerData', JSON.stringify(states));
};

const loadData = () => {
    const saved = localStorage.getItem('nyankoCheckerData');
    if (saved) {
        const states = JSON.parse(saved);
        const checkboxes = document.querySelectorAll('.target');
        checkboxes.forEach((cb, index) => {
            if (states[index] !== undefined) {
                cb.checked = states[index];
            }
        });
    }
};

const updateDisplays = () => {
    const groups = document.querySelectorAll('.group');
    let totalN = 0;
    let totalM = 0;

    groups.forEach(group => {
        const allBoxes = group.querySelectorAll('.target');
        const checkedBoxes = group.querySelectorAll('.target:checked');
        
        const n = checkedBoxes.length;
        const m = allBoxes.length;

        const fraction = group.querySelector('.fraction');
        const percentage = group.querySelector('.percentage');
        if (fraction) fraction.textContent = `${n} / ${m}`;
        if (percentage) {
            const percent = m > 0 ? Math.round((n / m) * 100) : 0;
            percentage.textContent = `${percent}%`;
        }

        totalN += n;
        totalM += m;
    });

    const totalFraction = document.getElementById('total-fraction');
    const totalPercentage = document.getElementById('total-percentage');

    if (totalFraction) totalFraction.textContent = `${totalN} / ${totalM}`;
    if (totalPercentage) {
        const totalPercent = totalM > 0 ? Math.round((totalN / totalM) * 100) : 0;
        totalPercentage.textContent = `${totalPercent}%`;
    }

    saveData();
};

document.addEventListener('change', (e) => {
    if (e.target.classList.contains('target')) {
        updateDisplays();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    updateDisplays();
});

const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});