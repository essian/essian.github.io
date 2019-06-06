import {
    Selector
} from 'testcafe';

fixture `Grist Calculator`.page `http://127.0.0.1:5500/index.html?#`;

test(`Ypp calculation is correct`, async t => {
    await t
        .typeText('#mixed-weight-g', '190')
        .typeText('#mixed-wraps', '445')
        .typeText('#mixed-length-inches', '18')
        .click('#calculate-mixed')

    const ypp = await Selector('#gristImperial').with({
        visibilityCheck: true
    })()

    await t.expect(ypp.value).eql('1062.36')
})

test(`mKg calculation is correct`, async t => {
    await t
        .typeText('#mixed-weight-g', '190')
        .typeText('#mixed-wraps', '445')
        .typeText('#mixed-length-inches', '18')
        .click('#calculate-mixed')

    const mkg = await Selector('#gristMetric').with({
        visibilityCheck: true
    })()

    await t.expect(mkg.value).eql('2140.86')
})