export function renderFooter(imgPrefix = "./") {
  return `
    <footer>
      <div>
        <div class="social-icons">
          <a href="#"><img src="${imgPrefix}assets/icons/SM-x.svg" alt="X" /></a>
          <a href="#"><img src="${imgPrefix}assets/icons/SM-instagram.svg" alt="Instagram" /></a>
          <a href="#"><img src="${imgPrefix}assets/icons/SM-facebook.svg" alt="Facebook" /></a>
          <a href="#"><img src="${imgPrefix}assets/icons/SM-youtube.svg" alt="YouTube" /></a>
          <a href="#"><img src="${imgPrefix}assets/icons/SM-tiktok.svg" alt="TikTok" /></a>
        </div>
        <div class="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Google Nest Commitment to Privacy</a>
          <a href="#">Sales Terms</a>
          <a href="#">Terms of Service</a>
          <div class="country">
            <img src="${imgPrefix}assets/icons/Spain.svg" alt="Spain" /> Spain
          </div>
        </div>
      </div>
    </footer>
  `;
}
