export interface QueueI {
    name: string,
    description: string,
    documents?: string,
    optinal_documents?: string,
    max_waiting_time?: string,
    symbol?: string,
    max_calls?: number,
    print_start?: string,
    print_end?: string,
    is_blocked?: boolean,
    waiting_time_operator?: number,
    auto_transfer?: boolean,
    max_transfer?: number,
    branch?: number,
    services?: number,
    operator: number[]
}

export interface oneQueueI {
    name: string,
    documents?: string,
    optional_documents?: string,
    description: string,
    id: number,
    operator?: number[],
    services: number,
    symbol: string,
    max_calls: string,
    branch: number,
    auto_transfer?: boolean
}