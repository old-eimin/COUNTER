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
        totalM +=m;
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

document.getElementById('share-twitter').addEventListener('click', (e) => {
    e.preventDefault();

    let totalN = 0, totalM = 0;
    let normalN = 0, normalM = 0;
    let collabN = 0, collabM = 0;
    
    // 特定のガチャ用の変数
    let aN = 0, aM = 0;
    let bN = 0, bM = 0;
    let cN = 0, cM = 0;
    let dN = 0, dM = 0;
    let eN = 0, eM = 0; 
    let fN = 0, fM = 0;
    let gN = 0, gM = 0;
    let hN = 0, hM = 0;
    let iN = 0, iM = 0;
    let jN = 0, jM = 0;
    let kN = 0, kM = 0;

    const groups = document.querySelectorAll('.group');

    groups.forEach(group => {
        const allBoxes = group.querySelectorAll('.target');
        const checkedBoxes = group.querySelectorAll('.target:checked');
        const n = checkedBoxes.length;
        const m = allBoxes.length;

        totalN += n;
        totalM +=m;

        if (group.id === 'a') {
            aN = n;
            aM =m;
        }

        if (group.id === 'b') {
            bN = n;
            bM =m;
        }

        if (group.id === 'c') {
            cN = n;
            cM = m;
        }

        if (group.id === 'd') {
            dN = n;
            dM = m;
        }

        if (group.id === 'e') {
            eN = n;
            eM = m;
        }

        if (group.id === 'f') {
            fN = n;
            fM = m;
        }

        if (group.id === 'g') {
            gN = n;
            gM = m;
        }

        if (group.id === 'h') {
            hN = n;
            hM = m;
        }

        if (group.id === 'i') {
            iN = n;
            iM = m;
        }

        if (group.id === 'j') {
            jN = n;
            jM = m;
        }

        if (group.id === 'k') {
            kN = n;
            kM = m;
        }

        if (group.classList.contains('normal-group')) {
            normalN += n;
            normalM +=m;
        } else if (group.classList.contains('collab-group')) {
            collabN += n;
            collabM +=m;
        }
    });

    const getP = (n, m) => m > 0 ? Math.round((n / m) * 100) : 0;

    const text = `超激数計\n\n` +
                 `${totalN}/${totalM} ${getP(totalN, totalM)}%\n` +
                 `常設${normalN}/${normalM} ${getP(normalN, normalM)}%\n` +
                 `ダイナ${aN}/${aM} ${getP(aN, aM)}%\n` +
                 `バサラ${bN}/${bM} ${getP(bN, bM)}%\n` +
                 `ギャルズ${cN}/${cM} ${getP(cN, cM)}%\n` +
                 `ドラゴン${dN}/${dM} ${getP(dN, dM)}%\n` +
                 `ウルズ${eN}/${eM} ${getP(eN, eM)}%\n` +
                 `ダクヒ${fN}/${fM} ${getP(fN, fM)}%\n` +
                 `アイアン${gN}/${gM} ${getP(gN, gM)}%\n` +
                 `ギャルモン${hN}/${hM} ${getP(hN, hM)}%\n` +
                 `ルガ族${iN}/${iM} ${getP(iN, iM)}%\n` +
                 `ゼウス${jN}/${jM} ${getP(jN, jM)}%\n` +
                 `エレピク${kN}/${kM} ${getP(kN, kM)}%\n` +
                 `コラボ${collabN}/${collabM} ${getP(collabN, collabM)}%\n\n` +
                 `#にゃんこ大戦争`;

    const url = window.location.href;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    
    window.open(twitterUrl, '_blank');
});