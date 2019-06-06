import {
    Selector
} from 'testcafe';

fixture `Grist Calculator`.page `http://127.0.0.1:5500/index.html?#`;

test(`Mixed calculation is correct`, async t => {
    await enterMixedData(t);

    const ypp = await getValue('#gristImperial')
    const mkg = await getValue('#gristMetric')
    const yards = await getValue('#totalLengthYards')
    const meters = await getValue('#totalLengthMeters')
    const yarnClass = await getValue('#class')

    await t.expect(ypp.value).eql('1062.36')
    await t.expect(mkg.value).eql('2140.86')
    await t.expect(yards.value).eql('445.00')
    await t.expect(meters.value).eql('406.76')
    await t.expect(yarnClass.value).eql('DK')
})

test(`Metric calculation is correct`, async t => {
    
    await t.click('#metric-button')
    await enterMetricData(t);

    const ypp = await getValue('#gristImperial')
    const mkg = await getValue('#gristMetric')
    const yards = await getValue('#totalLengthYards')
    const meters = await getValue('#totalLengthMeters')
    const yarnClass = await getValue('#class')

    await t.expect(ypp.value).eql('823.74')
    await t.expect(mkg.value).eql('1660.00')
    await t.expect(yards.value).eql('181.60')
    await t.expect(meters.value).eql('166.00')
    await t.expect(yarnClass.value).eql('Worsted/Aran')
})


async function getValue(id) {
    return await Selector(id).with({
        visibilityCheck: true
    })();
}

async function enterMixedData(t) {
    await t
        .typeText('#mixed-weight-g', '190')
        .typeText('#mixed-wraps', '445')
        .typeText('#mixed-length-inches', '18')
        .click('#calculate-mixed');
}

async function enterMetricData(t) {
    await t
        .typeText('#metric-weight-g', '100')
        .typeText('#metric-wraps', '100')
        .typeText('#metric-length-cm', '83')
        .click('#calculate-metric');
}
