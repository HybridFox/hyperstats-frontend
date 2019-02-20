import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const mapRecyclingProcesses = (obs$: Observable<any>) => {
    return obs$
        .pipe(
            filter((processes: any[]) => {
                return Array.isArray(processes);
            }),
            map((processes: any[]) => {
                return processes.reduce((acc, process) => {
                    if (!process) {
                        return acc;
                    }

                    return acc.concat({
                        value: process._id,
                        label: process.data.name,
                    });
                }, []);
            })
        );
};
