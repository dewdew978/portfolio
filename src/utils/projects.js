import { projectsData } from '@/data/projectsData'
export function getLocalizedProjects(t) { return Object.entries(projectsData).map(([key, project]) => [key, { ...project, ...(t.projects?.items?.[key] || {}) }]) }
