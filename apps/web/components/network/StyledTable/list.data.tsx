import { TableRow } from "./index";

export const exampleData: TableRow[] = [
  {
    id: "1",
    col1: "System Alpha",
    col2: "Active",
    col3: "Production",
    description:
      "This is the main production system handling over 1M requests per day. Currently running version 2.5.1 with automatic failover enabled. Last maintenance window: 2024-01-15",
  },
  {
    id: "2",
    col1: "Beta Service",
    col2: "Testing",
    col3: "Stage",
    description:
      "Beta environment for testing new features. Connected to sandbox database. Currently testing new authentication module.",
  },
  {
    id: "3",
    col1: "Cache Layer",
    col2: "Active",
    col3: "Redis",
    description: "Redis cluster with 5 nodes. Average hit rate: 94%. Memory usage: 75% of 32GB.",
  },
  {
    id: "4",
    col1: "Load Balancer",
    col2: "Active",
    col3: "HAProxy",
    description: "Primary load balancer distributing traffic across 8 application servers. SSL termination enabled.",
  },
  {
    id: "5",
    col1: "Database",
    col2: "Active",
    col3: "Primary",
    description: "PostgreSQL 15 cluster. Master node with 2 read replicas. Automated backups every 6 hours.",
  },
  {
    id: "6",
    col1: "Message Queue",
    col2: "Active",
    col3: "RabbitMQ",
    description:
      "Message broker handling async operations. Current queue size: 1.2k messages. Processing rate: 100msg/sec",
  },
  {
    id: "7",
    col1: "Search Engine",
    col2: "Active",
    col3: "Elastic",
    description: "Elasticsearch cluster. 3 data nodes, 2 client nodes. Index size: 250GB. Average query time: 45ms",
  },
  {
    id: "8",
    col1: "Storage",
    col2: "Active",
    col3: "S3",
    description: "Object storage service. Total size: 1.5TB. Monthly transfer: 5TB. Lifecycle policies enabled.",
  },
  {
    id: "9",
    col1: "CDN",
    col2: "Active",
    col3: "CloudFront",
    description:
      "Content delivery network. 35 edge locations. Cache hit ratio: 89%. SSL/TLS enabled with custom certificate.",
  },
  {
    id: "10",
    col1: "Monitoring",
    col2: "Active",
    col3: "Grafana",
    description:
      "System monitoring dashboard. 24 active alerts configured. 7-day data retention. Custom dashboards for each service.",
  },
  {
    id: "11",
    col1: "Backup System",
    col2: "Active",
    col3: "Daily",
    description:
      "Automated backup system. Full backup daily at 2 AM UTC. Incremental backups every 4 hours. 30-day retention.",
  },
  {
    id: "12",
    col1: "Auth Service",
    col2: "Active",
    col3: "OAuth",
    description: "Authentication service supporting OAuth 2.0 and JWT. Connected to LDAP. Rate limit: 1000 req/min.",
  },
  {
    id: "13",
    col1: "API Gateway",
    col2: "Active",
    col3: "Kong",
    description:
      "API Gateway managing all external requests. Rate limiting and authentication enabled. Custom plugins active.",
  },
  {
    id: "14",
    col1: "Logger",
    col2: "Active",
    col3: "ELK",
    description:
      "Centralized logging system. Processing 100GB logs daily. 14-day retention policy. Real-time alerting enabled.",
  },
  {
    id: "15",
    col1: "CI/CD",
    col2: "Active",
    col3: "Jenkins",
    description:
      "Continuous integration pipeline. Average build time: 12 minutes. Automated tests and deployment configured.",
  },
  {
    id: "16",
    col1: "DNS",
    col2: "Active",
    col3: "Route53",
    description: "DNS service with failover configuration. 99.99% uptime SLA. GeoDNS enabled for regional routing.",
  },
  {
    id: "17",
    col1: "Mail Service",
    col2: "Active",
    col3: "SES",
    description:
      "Email service for transactional emails. Sending rate: 50k/day. Bounce rate: 0.1%. SPF and DKIM configured.",
  },
  {
    id: "18",
    col1: "Analytics",
    col2: "Active",
    col3: "Mixpanel",
    description: "User behavior analytics. Tracking 50+ custom events. Real-time dashboard. Weekly automated reports.",
  },
  {
    id: "19",
    col1: "Search Cache",
    col2: "Active",
    col3: "Varnish",
    description: "HTTP cache for search results. Cache size: 4GB. Hit rate: 78%. Custom VCL rules implemented.",
  },
  {
    id: "20",
    col1: "Security",
    col2: "Active",
    col3: "WAF",
    description:
      "Web Application Firewall. Blocking 10k malicious requests daily. Custom rules for XSS and SQL injection protection.",
  },
];
