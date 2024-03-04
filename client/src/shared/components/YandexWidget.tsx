import Script from "next/script"

export const YAScript = () => {
  return (
    <Script id='yandex-afisha-script'>
    {`
      /* Настройка */
      var dealerName = 'YandexTicketsDealer';
      var dealer = window[dealerName] = window[dealerName] || [];

      dealer.push(['setDefaultClientKey', '225cf977-3c54-4744-82a6-0c650652e75d']);
      dealer.push(['setDefaultRegionId', 20720]);

      /* Загрузка */
      (function () {
          var rnd = '?' + new Date().getTime() * Math.random();
          var script = document.createElement('script');
          var target = document.getElementsByTagName('script')[0];
          script.async = true;
          script.src = 'https://widget.afisha.yandex.ru/dealer/dealer.js' + rnd;
          target.parentNode.insertBefore(script, target);
      })(); 
    `}
  </Script>
  )
}