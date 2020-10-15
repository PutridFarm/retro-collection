import scrapy


class GamesSpider(scrapy.Spider):
    name = 'games'
    allowed_domains = ['gamevaluenow.com']
    start_urls = ['https://gamevaluenow.com/super-nintendo/']

    def parse(self, response):
        games_table = response.xpath('//table[@id="platformGameListTable"]')
        rows = games_table.xpath('//tr')
        # Helpful debug: print("1 row", rows[1].xpath('.//td').extract())
        for row in rows[1:]:  # ignore first thead row
            title = row.xpath('.//td/a/text()').extract()
            loose_price = row.xpath('.//td[2]/text()').extract()
            complete_price = row.xpath('./td[3]/text()').extract()
            new_price = row.xpath('./td[4]/text()').extract()
            yield {'Title': title, 'Loose Price': loose_price, 'Complete Price': complete_price, 'New Price': new_price}
