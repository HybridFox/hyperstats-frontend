import { map, filter } from 'rxjs/operators';
import { Process } from 'src/app/recycling-processes/components/recycling-process-form/recycling-process.interface';

export const companiesToSelectOptions = (obs$) => {
    return obs$
        .pipe(
            filter((companies: any[]) => {
                return Array.isArray(companies);
            }),
            map((companies: any[]) => {
                return companies.reduce((acc, company) => {
                    if (!company) {
                        return acc;
                    }

                    return acc.concat({
                        value: company._id,
                        label: company.data.name
                    });
                }, []);
            })
        );
};

export const processStepsToSelectOptions = (obs$) => {
  return obs$
      .pipe(
          map((processSteps: Process) => {
              return processSteps.data.steps.reduce((acc, step) => {
                if (!step) {
                  return acc;
                }
                return acc.concat({
                  value: step._id,
                  label: step.description
                });
              }, []);
          })
      );
};
