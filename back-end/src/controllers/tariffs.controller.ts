import { Request, Response } from 'express';
import externalTariffProvider from '../data';

/**
 * gets the tariff from external provider
 * processes the tariff data from external provider
 * and returns the comparison as a json data
 */
const computeTariff = async (req: Request, res: Response) => {
    const consumption = req.body.consumption;
    const response = [];

    for (let i = 0; i < externalTariffProvider.length; i++) {
        if (externalTariffProvider[i].type === 1) {
            const tariffTypeOneCalculation =
                externalTariffProvider[i].baseCost * 12 +
                consumption * externalTariffProvider[i].additionalKwhCost * 0.01;
            const CostOneResponse = {
                tariffName: externalTariffProvider[i].name,
                annualCosts: tariffTypeOneCalculation
            };
            response.push(CostOneResponse);
        } else if (externalTariffProvider[i].type === 2) {
            const tariffTypeTwoCalculation =
                externalTariffProvider[i].baseCost + 500 * externalTariffProvider[i].additionalKwhCost * 0.01;
            let CostTwoResponse = {
                tariffName: externalTariffProvider[i].name,
                annualCosts: externalTariffProvider[i].baseCost
            };
            if (consumption > externalTariffProvider[i].includedKwh) {
                CostTwoResponse = {
                    tariffName: externalTariffProvider[i].name,
                    annualCosts: tariffTypeTwoCalculation
                };
            }
            response.push(CostTwoResponse);
        }
    }

    return res.status(200).json({
        message: response
    });
};

export default { computeTariff };
