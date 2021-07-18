const mongoose = require('mongoose');


const companySchema = mongoose.Schema({
    Symbol: String,
    AssetType: String,
    Name: String,
    Description: String,
    CIK: Number,
    Exchange: String,
    Currency: String,
    Country: String,
    Sector: String,
    Industry: String,
    Address: String,
    FiscalYearEnd: String,
    LatestQuarter: Date,
    MarketCapitalization: Number,
    EBITDA: Number,
    PERatio: Number,
    PEGRatio: Number,
    BookValue: Number,
    DividendPerShare: Number,
    DividendYield: Number,
    EPS: Number,
    RevenuePerShareTTM: Number,
    ProfitMargin: Number,
    OperatingMarginTTM: Number,
    ReturnOnAssetsTTM: Number,
    ReturnOnEquityTTM: Number,
    RevenueTTM: Number,
    GrossProfitTTM: Number,
    DilutedEPSTTM: Number,
    QuarterlyEarningsGrowthYOY: Number,
    QuarterlyRevenueGrowthYOY: Number,
    AnalystTargetPrice: Number,
    TrailingPE: Number,
    ForwardPE: Number,
    PriceToSalesRatioTTM: Number,
    PriceToBookRatio: Number,
    EVToRevenue: Number,
    EVToEBITDA: Number,
    Beta: Number,
    WeekHigh52: Number,
    WeekLow52: Number,
    DayMovingAverage50: Number,
    DayMovingAverage200: Number,
    SharesOutstanding: Number,
    SharesFloat: Number,
    SharesShort: Number,
    SharesShortPriorMonth: Number,
    ShortRatio: Number,
    ShortPercentOutstanding: Number,
    ShortPercentFloat: Number,
    PercentInsiders: Number,
    PercentInstitutions: Number,
    ForwardAnnualDividendRate: Number,
    ForwardAnnualDividendYield: Number,
    PayoutRatio: Number,
    DividendDate: Date,
    ExDividendDate: Date,
    LastSplitFactor: String,
    LastSplitDate: Date
}, { typeKey: '$type' });

// companySchema.set('validateBeforeSave', false);
// companySchema.path('Symbol').validate(function (value) {
//     return value != null;
// });


const polygonSchema = mongoose.Schema({
    ceo: String,
    logo: String,
    similar: Array,
    symbol: String,
    tags: Array
});


const yahooPriceSchema = mongoose.Schema({
    address1: String,
    averageVolume10days: String,
    ceo: String,
    city: String,
    country: String,
    dividendYield: Number,
    ebitda: String,
    enterpriseValue: String,
    fiftyDayAverage: Number,
    fiftyTwoWeekHigh: Number,
    fiftyTwoWeekLow: Number,
    fullTimeEmployees: Number,
    industry: String,
    longBusinessSummary: String,
    longName: String,
    marketCap: String,
    phone: { type: String, default: '----' },
    profitMargins: String,
    quoteSourceName: String,
    recommendationKey: String,
    regularMarketChange: Number,
    regularMarketChangePercent: Number,
    regularMarketDayHigh: Number,
    regularMarketDayLow: Number,
    regularMarketOpen: Number,
    regularMarketPreviousClose: Number,
    regularMarketPrice: Number,
    regularMarketTime: Date,
    regularMarketVolume: String,
    returnOnEquity: String,
    sector: String,
    shortName: String,
    state: String,
    summaryDetail: Object,
    symbol: String,
    twoHundredDayAverage: Number,
    website: String,
    _52WeekChange: Number
});

const extraSchema = mongoose.Schema({
    logo_url : String
});


module.exports = {
    company: mongoose.model('Company', companySchema),
    polygon: mongoose.model('Polygon', polygonSchema),
    price: mongoose.model('Price', yahooPriceSchema),
    info: mongoose.model('Infos', extraSchema)
}