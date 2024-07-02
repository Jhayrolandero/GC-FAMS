export interface Research {
    research_ID: number,
    research_name: string,
    publish_date: Date,
    research_link: string,
}

export interface ResearchAuthor {
    research_auhor_ID: number,
    research_ID: number,
    research_author_name: string,
}