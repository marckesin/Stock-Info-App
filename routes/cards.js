const express = require('express');
const https = require('https');
const _ = require('lodash');

// Importação das Schemas
const Company = require('../models/stock.model.js').company;
const Polygon = require('../models/stock.model.js').polygon;
const Price = require('../models/stock.model.js').price;

const router = express.Router();

const companyInfo = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                let chunks = [];
                response.on("data", (data) => {
                    chunks.push(data);
                }).on('end', () => {
                    const data = Buffer.concat(chunks);
                    const dados = JSON.parse(data);

                    try {
                        const companyData = new Company({
                            Symbol: dados.Symbol,
                            AssetType: dados.AssetType,
                            Name: dados.Name,
                            Description: dados.Description,
                            CIK: dados.CIK,
                            Exchange: dados.Exchange,
                            Currency: dados.Currency,
                            Country: dados.Country,
                            Sector: dados.Sector,
                            Industry: dados.Industry,
                            Address: dados.Address,
                            FiscalYearEnd: dados.FiscalYearEnd,
                            LatestQuarter: dados.LatestQuarter,
                            MarketCapitalization: dados.MarketCapitalization,
                            EBITDA: dados.EBITDA,
                            PERatio: dados.PERatio,
                            PEGRatio: dados.PEGRatio,
                            BookValue: dados.BookValue,
                            DividendPerShare: dados.DividendPerShare,
                            DividendYield: dados.DividendYield,
                            EPS: dados.EPS,
                            RevenuePerShareTTM: dados.RevenuePerShareTTM,
                            ProfitMargin: dados.ProfitMargin,
                            OperatingMarginTTM: dados.OperatingMarginTTM,
                            ReturnOnAssetsTTM: dados.ReturnOnAssetsTTM,
                            ReturnOnEquityTTM: dados.ReturnOnEquityTTM,
                            RevenueTTM: dados.RevenueTTM,
                            GrossProfitTTM: dados.GrossProfitTTM,
                            DilutedEPSTTM: dados.DilutedEPSTTM,
                            QuarterlyEarningsGrowthYOY: dados.QuarterlyEarningsGrowthYOY,
                            QuarterlyRevenueGrowthYOY: dados.QuarterlyRevenueGrowthYOY,
                            AnalystTargetPrice: dados.AnalystTargetPrice,
                            TrailingPE: dados.TrailingPE,
                            ForwardPE: dados.ForwardPE,
                            PriceToSalesRatioTTM: dados.PriceToSalesRatioTTM,
                            PriceToBookRatio: dados.PriceToBookRatio,
                            EVToRevenue: dados.EVToRevenue,
                            EVToEBITDA: dados.EVToEBITDA,
                            Beta: dados.Beta,
                            WeekHigh52: dados["52WeekHigh"],
                            WeekLow52: dados["52WeekLow"],
                            DayMovingAverage50: dados["50DayMovingAverage"],
                            DayMovingAverage200: dados["200DayMovingAverage"],
                            SharesOutstanding: dados.SharesOutstanding,
                            SharesFloat: dados.SharesFloat,
                            SharesShort: dados.SharesShort,
                            SharesShortPriorMonth: dados.SharesShortPriorMonth,
                            ShortRatio: dados.ShortRatio,
                            ShortPercentOutstanding: dados.ShortPercentOutstanding,
                            ShortPercentFloat: dados.ShortPercentFloat,
                            PercentInsiders: dados.PercentInsiders,
                            PercentInstitutions: dados.PercentInstitutions,
                            ForwardAnnualDividendRate: dados.ForwardAnnualDividendRate,
                            ForwardAnnualDividendYield: dados.ForwardAnnualDividendYield,
                            PayoutRatio: dados.PayoutRatio,
                            DividendDate: dados.DividendDate,
                            ExDividendDate: dados.ExDividendDate,
                            LastSplitFactor: dados.LastSplitFactor,
                            LastSplitDate: dados.LastSplitDate
                        });
                        resolve(companyData);
                    } catch (err) {
                        console.log(`COMPANY: ${err}`);
                        reject(err);
                    }
                });
            } else {
                reject(response.statusCode);
            }
        });
    });
}


const polygonInfo = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.on('data', (data) => {
                    const parseData = JSON.parse(data);

                    try {
                        const polygonData = new Polygon({
                            ceo: parseData.ceo,
                            logo: parseData.logo,
                            similar: parseData.similar,
                            symbol: parseData.symbol,
                            tags: parseData.tags
                            // phone: parseData.phone,
                            // url: parseData.url,
                            // description: parseData.description,
                            // exchange: parseData.exchange,
                            // name: parseData.name,
                            // exchangeSymbol: parseData.exchangeSymbol,
                            // hq_address: parseData.hq_address,
                            // hq_state: parseData.hq_state,
                            // hq_country: parseData.hq_country,
                            // type: parseData.type,
                            // updated: parseData.updated,
                            // active: parseData.active
                        });
                        resolve(polygonData);
                    } catch (err) {
                        console.log(`POLYGON: ${err}`);
                        reject(err);
                    }
                });
            } else {
                reject(response.statusCode);
            }
        })
    });
}


const priceInfo = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                let chunks = [];
                response.on("data", (data) => {
                    chunks.push(data);
                }).on('end', () => {
                    const data = Buffer.concat(chunks);
                    const dados = JSON.parse(data);
                    const result = dados.quoteSummary.result[0];

                    console.log(result);

                    try {
                        const priceData = new Price({
                            address1: decodeURIComponent(escape(result.assetProfile.address1)),
                            averageVolume10days: result.summaryDetail.averageVolume10days.fmt,
                            ceo: decodeURIComponent(escape(result.assetProfile.companyOfficers[0].name.slice(3, 30))),
                            city: decodeURIComponent(escape(result.assetProfile.city)),
                            country: result.assetProfile.country,
                            currency: result.price.currency,
                            currencySymbol: result.price.currencySymbol,
                            dividendYield: ((result.summaryDetail.dividendYield.raw) * 100).toFixed(2),
                            ebitda: result.financialData.ebitda.fmt,
                            enterpriseValue: result.defaultKeyStatistics.enterpriseValue.fmt,
                            exchange: result.price.exchange,
                            exchangeName: result.price.exchangeName,
                            fiftyDayAverage: (result.summaryDetail.fiftyDayAverage.raw).toFixed(2),
                            fiftyTwoWeekHigh: result.summaryDetail.fiftyTwoWeekHigh.raw,
                            fiftyTwoWeekLow: result.summaryDetail.fiftyTwoWeekLow.raw,
                            fullTimeEmployees: result.assetProfile.fullTimeEmployees,
                            industry: _.toUpper(result.assetProfile.industry),
                            longBusinessSummary: decodeURIComponent(escape(result.assetProfile.longBusinessSummary)),
                            longName: result.price.longName,
                            marketCap: result.price.marketCap.fmt,
                            peRatio: (result.indexTrend.peRatio.raw).toFixed(2),
                            phone: result.assetProfile.phone,
                            quoteSourceName: result.price.quoteSourceName,
                            regularMarketChange: (result.price.regularMarketChange.raw).toFixed(2),
                            regularMarketChangePercent: ((result.price.regularMarketChangePercent.raw) * 100).toFixed(2),
                            regularMarketDayHigh: (result.price.regularMarketDayHigh.raw).toFixed(2),
                            regularMarketDayLow: (result.price.regularMarketDayLow.raw).toFixed(2),
                            regularMarketOpen: (result.price.regularMarketOpen.raw).toFixed(2),
                            regularMarketPreviousClose: (result.price.regularMarketPreviousClose.raw).toFixed(2),
                            regularMarketPrice: (result.price.regularMarketPrice.raw).toFixed(2),
                            regularMarketTime: new Date(result.price.regularMarketTime * 1000).getTime(),
                            regularMarketVolume: result.price.regularMarketVolume.fmt,
                            sector: _.toUpper(result.assetProfile.sector),
                            shortName: _.startCase(_.toLower(result.price.shortName)),
                            state: result.assetProfile.state,
                            summaryDetail: result.summaryDetail,
                            symbol: _.toUpper(result.price.symbol),
                            // trailingPE: (result.summaryDetail.trailingPE.raw).toFixed(2),
                            twoHundredDayAverage: (result.summaryDetail.twoHundredDayAverage.raw).toFixed(2),
                            website: result.assetProfile.website,
                            _52WeekChange: ((result.defaultKeyStatistics["52WeekChange"].raw) * 100).toFixed(2)
                        });
                        resolve(priceData);
                    } catch (err) {
                        console.log(`PRICE: ${err}`);
                        reject(err);
                    }
                });
            } else {
                reject(response.statusCode);
            }
        });
    });
}


const companySave = async (company) => {
    await Company.countDocuments({ Symbol: company.Symbol }, (err, count) => {
        if (err) {
            console.log(err);
        } else {
            if (count === 0) {
                company.validate({ validateModifiedOnly: true }, (err) => { // Valida todas as fields que tenham alguma modificação no seu tipo
                    if (err) {
                        console.log(`Dados não validados (${company.Symbol}): ${err}`);
                    } else {
                        company.save((err) => {
                            if (err) {
                                console.log(`Erro ao salvar (${company.symbol}) no banco de dados: ${err}`);
                            }
                        });
                    }
                });
            }
        }
    });
}


const polygonSave = async (polygon) => {
    await Polygon.countDocuments({ symbol: polygon.symbol }, (err, count) => {
        if (!err && count === 0) {
            polygon.validate({ validateModifiedOnly: true }, (err) => {
                if (!err) {
                    polygon.save()
                } else {
                    console.log(`Polygon - Erro ao salvar: ${err} `);
                }
            });
        }
    });
}


const priceSave = async (price) => {
    await Price.countDocuments({ symbol: price.symbol }, (err, count) => {
        if (!err && count === 0) {
            price.validate({ validateModifiedOnly: true }, (err) => {
                // price.validate((err) => {
                if (!err) {
                    price.save()
                } else {
                    console.log(`Price - Erro ao salvar: ${err} `);
                }
            });
        }
    });
}


router.get('/', async (req, res) => {
    await Price.find((err, prices) => {
        if (!err && prices) {
            res.render("cards", { info: prices.reverse() });
        }
    });
});


router.post("/", async (req, res) => {
    const apiKeyAlpha = process.env.API_KEY_ALPHA;
    const apiKeyBeta = process.env.API_KEY_BETA;
    const search = req.body.search;
    const companyOverview = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${search}&apikey=${apiKeyAlpha}`;
    const polygon = `https://api.polygon.io/v1/meta/symbols/${_.toUpper(search)}/company?&apiKey=${apiKeyBeta}`;
    const yahooFinance = `${process.env.YAHOO_API_ENDPOINT}${search}?modules=price,assetProfile,summaryDetail,financialData,indexTrend,defaultKeyStatistics`;


    await priceInfo(yahooFinance).then(async (data) => {
        await priceSave(data);
    }).catch((err) => {
        console.error(`PRICE - Informação não encontrada: ${err}`);
    });

    await polygonInfo(polygon).then(async (data) => {
        await polygonSave(data);
    }).catch((err) => {
        console.error(`POLYGON - Informação não encontrada: ${err}`);
    });

    await Price.find({}, {});

    res.redirect("/cards");
});


module.exports = router;