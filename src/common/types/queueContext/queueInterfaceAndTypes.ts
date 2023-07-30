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


export interface oneUserI {
    first_name: string,
    last_name?: string,
    surname?: string,
    phone?: string,
    birth_date?: string,
    banned?: boolean,
    position: string,
    avatar?: string,
    bio?: string
}

export interface queueSettings {
    is_blocked: boolean,
    auto_transfer: string,
    max_calls: number,
    max_transfers: string,
    waiting_time_operator: string,
    printing_time: string,
    print_end: string,
    print_start: string,
    switch: string
}