import {
    Selector
} from 'testcafe';

fixture `Grist Calculator`.page `http://127.0.0.1:5500/index.html?#`;

test(`Calculation is correct`, async t => {
            await t
                .typeText('#mixed-weight-g', '190')
                .typeText('#mixed-wraps', '445')
                .typeText('#mixed-length-inches', '18')
                .click('#calculate-mixed')

                let ypp = await Selector('#gristImperial')
                await t.expect(ypp.innertext).eql('1')
                })