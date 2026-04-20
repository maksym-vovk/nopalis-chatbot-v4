function setCustomerData() {
    const userID = localStorage.getItem('userID');
    const name = localStorage.getItem('chatFormName');
    const phone = localStorage.getItem('chatFormPhone');

    const chatAnalytics = JSON.parse(localStorage.getItem(`chatAnalytics_${userID}`)) || {};
    const chatName = chatAnalytics['LP_full_name'];
    const chatPhone = chatAnalytics['LP_contact_phone'];

    const clientNameEl = document.querySelector('.x_client_name');
    const clientPhoneEl = document.querySelector('.x_client_phone');

    if (chatName && chatPhone) {
        clientNameEl.innerHTML = chatName;
        clientPhoneEl.innerHTML = chatPhone;
    } else if (name && phone) {
        clientNameEl.innerHTML = name;
        clientPhoneEl.innerHTML = phone;
    }

    sendDataToSheet(userID)
    cleanLocalStorage(userID);
}

function cleanLocalStorage(id) {
    localStorage.removeItem('userID');
    localStorage.removeItem('chatFormName');
    localStorage.removeItem('chatFormPhone');
    localStorage.removeItem(`chatAnalytics_${id}`);
}

function getSavedAnalytics(userID) {
    try {
        const storageKey = `chatAnalytics_${userID}`;
        const raw = localStorage.getItem(storageKey);
        return raw ? JSON.parse(raw) : null;
    } catch (err) {
        console.error('[ChatBot] Error reading analytics from localStorage:', err);
        return null;
    }
}

async function sendDataToSheet(id, data) {
    const url = 'https://api.apispreadsheets.com/data/7juvGn3tVOzKKT3N/';
    const query = `select * from 7juvGn3tVOzKKT3N where userID = '${id}'`;

    // merge with locally stored analytics to avoid wiping columns
    const saved = getSavedAnalytics(id) || {};
    const {lastUpdated, lastUpdatedTimestamp, ...cleanSaved} = saved;
    const mergedData = {...cleanSaved, ...data};

    // keep local copy in sync
    // this._saveAnalyticsToLocalStorage(mergedData);

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                accessKey: '1ce1a4041466d1775c7b6c04bbe90cae',
                secretKey: 'b29cf96857345234354b8c78476bf636',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data: mergedData, query}),
        });

        if (response.status !== 201) {
            response = await fetch(url, {
                method: 'POST',
                headers: {
                    accessKey: '1ce1a4041466d1775c7b6c04bbe90cae',
                    secretKey: 'b29cf96857345234354b8c78476bf636',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({data: mergedData}),
            });
        }
    } catch (err) {
        console.error('Error submitting to Apispreadsheets:', err);
    }
}

function main() {
    setCustomerData();
}

main();