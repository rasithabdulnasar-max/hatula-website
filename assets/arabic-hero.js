// Arabic Hero Heading refinement
if (document.documentElement.lang === 'ar') {
  const heading = document.querySelector('.hero h1');
  if (heading) {
    heading.innerHTML = 'حلول التكييف، أنظمة إدارة المباني <em>والمعدات الكهروميكانيكية الصناعية</em>';
  }
}
