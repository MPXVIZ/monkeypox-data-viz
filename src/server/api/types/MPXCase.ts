export type MPXCase = Record<string, string> & {
    ID: string;
    Status: string;
    Location: string;
    City: string;
    Country: string;
    Age: string;
    Gender: string;
    Date_onset: string;
    Date_confirmation: string;
    Symptoms: string;
    'Hospitalised (Y/N/NA)': string;
    Date_hospitalisation: string;
    'Isolated (Y/N/NA)': string;
    Date_isolation: string;
    Outcome: string;
    Date_death: string;
    Contact_comment: string;
    Contact_ID: string;
    Contact_location: string;
    'Travel_history (Y/N/NA)': string;
    Travel_history_entry: string;
    Travel_history_start: string;
    Travel_history_location: string;
    Travel_history_country: string;
    Genomics_Metadata: string;
    Confirmation_method: string;
    Source: string;
    Source_II: string;
    Date_entry: string;
    Date_last_modified: string;
    Source_III: string;
    Source_IV: string;
    Country_ISO3: string;
};