'use strict';

import { assert } from 'chai';
import * as Sinon from 'sinon';

import { swansonLibPackage } from '../../data/cargo-packages';
import {
    rustAdapterParams,
    treeNodes
} from '../../test-utils';
import { loadPackageUnitTestTree } from '../../../src/test-loader';
import { ICargoTestListResult } from '../../../src/interfaces/cargo-test-list-result';
import * as cargo from '../../../src/cargo';
import * as unitParser from '../../../src/parsers/unit-parser';

// tslint:disable-next-line:max-func-body-length
export default function suite() {
    let getCargoUnitTestListForPackageStub: Sinon.SinonStub;
    let parseCargoTestListResultsStub: Sinon.SinonStub;
    const { logStub } = rustAdapterParams;
    const { binLoadedTestsResultStub } = treeNodes;

    setup(() => {
        getCargoUnitTestListForPackageStub = Sinon.stub(cargo, 'getCargoUnitTestListForPackage');
        parseCargoTestListResultsStub = Sinon.stub(unitParser, 'parseCargoTestListResults');
    });

    test('Should handle error correctly', async () => {
        const expErr = new Error('load failed');
        getCargoUnitTestListForPackageStub.throws(() => expErr);
        try {
            await loadPackageUnitTestTree(null, null);
            assert.fail('Should have thrown');
        } catch (err) {
            assert.deepEqual(err, expErr);
        }
    });

    test('Should correctly load tree', async () => {
        const cargoTestListResults: ICargoTestListResult[] = [];
        getCargoUnitTestListForPackageStub.callsFake(() => cargoTestListResults);
        parseCargoTestListResultsStub.callsFake(() => binLoadedTestsResultStub);
        const result = await loadPackageUnitTestTree(swansonLibPackage, logStub);
        assert.deepEqual(result, binLoadedTestsResultStub);
        assert.isTrue(getCargoUnitTestListForPackageStub.calledWithExactly(swansonLibPackage, logStub));
        assert.isTrue(parseCargoTestListResultsStub.calledWithExactly(swansonLibPackage, cargoTestListResults));
    });
}
