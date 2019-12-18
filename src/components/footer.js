export const createFooter = (filmСards) => {
  return (
    `
    <section class="footer__logo logo logo--smaller">Cinemaddict</section>
    <section class="footer__statistics">
    <p>${filmСards.length} movies inside</p>
    </section>
  `
  );
};
