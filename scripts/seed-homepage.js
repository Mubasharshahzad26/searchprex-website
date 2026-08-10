const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const existingPage = await prisma.page.findUnique({
    where: { slug: '/' }
  });

  if (!existingPage) {
    await prisma.page.create({
      data: {
        slug: '/',
        title: 'SEO Agency USA | Law Firm & Ecommerce SEO and Local SEO | SearchPrex',
        metaDescription: 'SearchPrex is a US-Focused SEO agency specializing in law firm SEO, Shopify ecommerce SEO, and local SEO for small businesses.',
        canonicalUrl: 'https://www.searchprex.com',
        contentBlocks: {
          jsonLd: {
            // we can store anything here
            enabled: true
          }
        }
      }
    });
    console.log("Homepage SEO seeded into database.");
  } else {
    console.log("Homepage SEO already exists in database.");
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
