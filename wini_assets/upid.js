/* eslint-disable */
document.addEventListener('DOMContentLoaded', function () {
    const upidInput = document.getElementById('upid');
    const upidSubmit = document.getElementById('upid_submit');

    const upidPrefixes = ['upid', 'upid-suche'];

    const setUpidFromUrl = () => {
        const parts = window.location.pathname.split('/');
        for (let i = 0; i < parts.length - 1; i++) {
            if (upidPrefixes.includes(parts[i]) && parts[i + 1]) {
                upidInput.value = decodeURIComponent(parts[i + 1]);
                break;
            }
        }
    };

    const updateUrlWithUpid = () => {
        const upidValue = upidInput.value.trim();
        if (!upidValue) return;

        const parts = window.location.pathname.split('/');
        const newParts = [];
        let skipNext = false;
        let replaced = false;

        for (let i = 0; i < parts.length; i++) {
            if (skipNext) {
                skipNext = false;
                continue;
            }

            if (!replaced && upidPrefixes.includes(parts[i])) {
                newParts.push(parts[i]);
                if (parts[i + 1]) {
                    // ersetze bestehenden UPID-Wert
                    newParts.push(encodeURIComponent(upidValue));
                    skipNext = true;
                } else {
                    // füge neuen UPID-Wert hinzu
                    newParts.push(encodeURIComponent(upidValue));
                }
                replaced = true;
            } else {
                newParts.push(parts[i]);
            }
        }

        // Wenn bisher kein upidPrefix gefunden wurde → am Ende anhängen
        if (!replaced) {
            newParts.push('upid');
            newParts.push(encodeURIComponent(upidValue));
        }

        const newPath = '/' + newParts.filter(Boolean).join('/');
        window.location.href = newPath;
    };

    upidSubmit.addEventListener('click', updateUrlWithUpid);
    setUpidFromUrl();
});
