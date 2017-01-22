sitemaps.add('/sitemap.xml', function () {
  newDate = Date('Sat Jan 21 2017 19:39:25 GMT-0500 (EST)')
  return [
    {page: '/', lastmod: newDate},
    {page: '/our-vision', lastmod: newDate},
    {page: '/contact', lastmod: newDate},
    {page: '/not-found', lastmod: newDate,
      images: [
      { loc: '/vision_header.jpg' }
      ]
    }
  ]
});
