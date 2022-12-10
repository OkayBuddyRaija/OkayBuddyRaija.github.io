export interface ItemData {
    id:                        number;
    type:                      number;
    rarity:                    number;
    name:                      number;
    desc:                      number;
    item_effect_desc_text:     number;
    can_use:                   boolean;
    dungeon_only:              boolean;
    buying_price:              number;
    selling_price:             number;
    stack_inventory_num:       number;
    stack_storage_num:         number;
    icon_name:                 string;
    item_recast_time:          number;
    active:                    boolean;
    efficacies:                Efficacy[];
    obtaining_route:           number;
    obtaining_route_detail_id: string;
    item_level:                number;
    item_exp:                  number;
    is_accounting:             boolean;
    no_sale_flag:              number;
    is_no_dissolution:         boolean;
    sort_id:                   number;
    adventurer_rank:           number;
    unidentified_icon_name:    string;
    unidentified_name:         number;
    unidentified_desc:         number;
    category:                  number;
    supply_flag:               number;
    created_at:                string;
    updated_at:                string;
}

export interface Efficacy {
    type:  number;
    value: number;
    time:  number;
}

// Generated by https://quicktype.io

export interface TextGroup {
    name:  string;
    texts: Text[];
}

export interface Text {
    id:   number;
    text: string;
}

