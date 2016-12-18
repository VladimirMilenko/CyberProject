import AbstractStatus from './AbstractStatus';
import * as React from 'react';

export class PipelineStatus extends AbstractStatus {
    statusParameterName = "pipeline_status";
    status: any;

    public fromJS(json: any): void {
        this.status = json[this.statusParameterName];
    }

    public renderStatus(): JSX.Element {
        return (
            <div>
                test
            </div>
        )
    }
}