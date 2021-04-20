import { gql } from "apollo-server";

export const typeDefs = gql`

    scalar Date

    enum assetCode{
        usdt eur
    }

    enum Action{
        transfer
    }
    
    enum ProfileType{
        language
    }

    enum Category{
        sicbo 
        baccarat_sicbo 
        game_shows 
        top_games 
        reward_games 
        slots
        roulette
        blackjack
        baccarat
        dhp
        monopoly
        crazytime
        craps
        sidebetcity
        holdem
        megaball
        csp
        lightningdice
        thb
        eth
        scalableblackjack
        topcard
        powerscalableblackjack
        americanroulette
        rngmoneywheel
        freebetblackjack
    }

    enum CurrencyCode{
        AED AFN ALL AMD ANG AOA ARS AWG AZN BAM BBD BDT BGN BHD BIF BMD BND BOB BRL BSD BTN BWP BYN BZD CAD CDF CHF CLP CNY COP CRC RSD CVE CZK DJF DKK DOP DZD EGP ERN ETB EUR FJD FKP GBP GEL GHS GIP GMD GNF 
        GTQ GYD HKD HNL HRK HTG HUF IDR ILS INR IQD ISK JMD JOD JPY KES KGS KHR KMF KRW KWD KYD LAK LBP LRD LSL LYD MAD MDL MGA MKD MMK MNT MOP MUR MVR MWK MXN MYR NAD NGN NIO NOK NPR NZD OMR PAB PEN PGK PHP 
        PKR PLN PYG QAR RON RUB RWF SAR SBD SCR SDG SEK SGD SHP SLL SOS SRD SVC SZL THB TJS TMT TND TOP TRY TTD TWD TZS UAH UGX USD UYU UZS VES VND VUV WST XAG XAF XAU XCD XDR XOF XPD XPF XPT YER ZAR ZMW
    }

    enum CountryCode { 
        AD AE AF AG AI AL AM AN AO AQ AR AS AT AU AW AZ BA BB BD BE BF BG BH BI BJ BM BN BO BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ 
        FK FM FO FR FX GA GB GD GE GF GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IN IO IQ IR IS IT JM JO JP KE KG KH KI KM KN KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD MG MH MK 
        ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR ST SV SZ TC TD 
        TF TG TH TJ TK TM TN TO TP TR TT TV TW TZ UA UG UK UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT YU ZA ZM ZW IM AX BL BQ GG JE ME MF SS SX TL
    }

    enum LanguageCode { 
        al sq ar hy bp bg cf ca cn zh b5 hr cs dk da nl en et fi fl fr ka de el he hi hu id it ja ko lv lt ms 
        mn no pl pt ro ru sr sk sl es sv th tr ua uk vi
    }

    enum SortDirectList{
        inc dec
    }

    enum BalanceSortTypeList{
        date type
    }

    enum BalanceTransactionList{
        transfer receiveTransfer deposit withdraw
    }

    type Asset {
        balance:String
        address:String
    }

    type Assets{
        usdt:Asset
        eur:Asset
    }

    type RecentGame{
        tableId: String,
        gameType: String,
        updatedAt: Date
    }

    type Profile {
        username:String
        email:String
        avatarURI:String
        assets:Assets
        isTwoFA:Boolean
        recentGames:[RecentGame]
        language:String
    }
    type Winner {
        username:String
        gameType:String
        amount:String
        currency:String
        createdAt:Date
        tableId:String
    }
    type BalanceAfterTransfer {
        receiverBalance:String
        senderBalance:String
    }

    type TransactionInfo {
        gameType:String
        gameId:String
        amount:String
        profit:String
        dateTime:Date
    }

    # Auth Evo Input
    
    input EvoAuthAccount {
        # uuid:String!
        # player:EvoAuthPlayer!
        config:EvoAuthConfig!
    }

    # input EvoAuthPlayer{
        # id:String!
        # update:Boolean!
        # firstName:String
        # lastName:String
        # nickname:String
        # country:CountryCode!
        # language:LanguageCode!
        # currency:CurrencyCode!
        # session:EvoAuthSession!
        # group:EvoAuthGroup
    # }

    # input EvoAuthSession{
    #     id:String!
    #     ip:String!
    # }

    enum GroupAction{
        assign clear
    }

    enum TableFilterBy{
        name gameType 
    }
    
    enum TableSortBy{
        name players
    }

    input EvoAuthGroup{
        id:String
        action:GroupAction!
    }

    input EvoAuthConfig{
        brand: EvoAuthBrand
        game:EvoAuthGame
        channel: EvoAuthChannel!
        urls: EvoAuthUrl
        freeGames: Boolean
    }

    input EvoAuthBrand{
        id:String
        skin:String
       
    }


    input EvoAuthGame{
        category: String
        interface: String
        table:EvoAuthTable
    }

    input EvoAuthTable{
        id:String!
        seat: Int
    }

    input EvoAuthChannel{
        wrapped:Boolean!
        mobile:Boolean
    }

    input EvoAuthUrl{
        cashier: String
        responsibleGaming: String
        lobby: String
        sessionTimeout: String
        gameHistory: String
        realityCheckURL: String
        rngGoLiveURL: String
        rngGoLiveURLMobile: String
        rngLobbyButton: String
        rngCloseButton: String
        rngHomeButton: String
        rngSessionTimeout: String
        rngErrorHandling: String
        sweSelfTest: String
        sweGameLimits: String
        sweSelfExclusion: String
    }

    # Auth Evo Response
    type EvoAuthResponse {
        entry:String!
        entryEmbedded:String!
    }

    # Evo Table Response

    type EvoTable{
        id:String
        name:String
        gameType:String
        language:String
        open:Boolean
        players:Int
        display:String
        videoSnapshot:EvoTableVideoSnapshot
        betLimits:EvoTableBetLimits
    }

    type EvoTableVideoSnapshot{
        links: SizeLink
        thumbnails: SizeLink
    }

    type EvoTableBetLimits{
        USD:EvoTableBetLimit
        EUR:EvoTableBetLimit
    }

    type EvoTableBetLimit {
        symbol:String
        min:Float
        max:Float
    }

    type SizeLink{
        S:String
        M:String
        L:String
        XL:String
    }

    type BalanceTransaction {
        type:String
        id:String
        amount:String
        assetType:String
        date:Date
        sender:String
        receiver:String
        contractId:String
        status:String
        fee:Float
        amountWithFee:Float
    }

    type Winners{
        totalItems:Int
        executionTime:String
        winnerResults:[Winner]
    }

    type BalanceTransactions{
        totalItems:Int
        executionTime:String
        balanceTransactionResults:[BalanceTransaction]
    }

    type TransactionInfos{
        totalItems:Int
        executionTime:String
        transactionResults:[TransactionInfo]
    }

    type ConvertInfo{
        slug:String
        from:assetCode
        to:assetCode
        rate:Float
        rateUpdatedAt:Date
        amount:Float
        convertAmount:Float
        createdAt:Date
        fee:Int
    }

    type ConvertHistory{
        totalItems:Int
        executionTime:String
        convertResults:[ConvertInfo]
    }


    type RateResult{
        rate:String
        updatedAt:Date
        fee:Int
        expiredAt:Date
    }

    type Fees{
        withdrawFee: Float
        depositFee: Float
        convertFee: Float
        transferFee: Float
    }


    # Query and Mutation
    
    type Query {
        evo_admin_verify_email_check(email:String):String
        evo_admin_user_email_check(username:String):String
        evo_admin_2FA_remove(slug:String):String
        evo_admin_user_action_history_check(slug:String):String
    }

    type Mutation {
      evo_admin_promotion_deposit_cal(from:Float!,to:Float!):String
      evo_admin_promotion_deposit_send(from:Float!,to:Float!):String
    }


`;

export const SubTypeDefs = gql`
     scalar Date

    enum assetCode{
        usdt eur
    }

    type RateSubMessage{
        rate:String
        updatedAt:Date
    }

    type Subscription {
        rate_listen(from:assetCode!,to: assetCode!): RateSubMessage
    }
    
    type Query{
        hello:String
    }
`
