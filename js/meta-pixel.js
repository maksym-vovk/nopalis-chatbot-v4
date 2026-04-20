const UrlUtils = {
    getAllSearchParams(url) {
        const urlString = url || window.location.href;
        const queryString = urlString.split('?').slice(1).join('&');

        if (!queryString) return {};

        const cleanQuery = queryString.split('#')[0];

        const params = new URLSearchParams(cleanQuery);
        const result = {};

        for (const [key, value] of params) {
            if (result[key]) {
                result[key] = Array.isArray(result[key])
                    ? [...result[key], value]
                    : [result[key], value];
            } else {
                result[key] = value;
            }
        }

        return result;
    }
}

const TrackingPixel = {
    insertPixelScript(id, type) {
        if (!id || type === 'Lead') return;

        const script = document.createElement('script')
        script.innerHTML = `!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${id}');
            fbq('track', 'PageView');`
        document.head.prepend(script)
    },

    insertPixelImage(id, type) {
        if (!id) return;

        const pixelImg = document.getElementById('meta-pixel-lead')

        if (pixelImg) return;

        const img = document.createElement('img')

        img.height = 1
        img.width = 1
        img.style.display = 'none'
        img.id = "meta-pixel-lead"
        img.src = `https://www.facebook.com/tr?id=${id}&ev=${type}&noscript=1`

        document.body.prepend(img)
    }
}

const TrackingManager = {
    init() {
        // const pageType = window.location.pathname.includes('subscribe') ? 'Lead' : 'PageView';
        const params = UrlUtils.getAllSearchParams()
        const id = params?.pixel

        if (!id) {
            console.warn('Pixel ID not found in URL parameters');
            return;
        }

        // TrackingPixel.insertPixelScript(id, 'PageView')
        TrackingPixel.insertPixelImage(id, 'Lead')
    }
}

// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', () => TrackingManager.init());
// } else {
//     TrackingManager.init();
// }