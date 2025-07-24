"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, easeOut } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, ShieldCheck, RefreshCw, FileText } from "lucide-react"

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
}

const introHighlights = [
  {
    icon: ShieldCheck,
    title: "Disaster Recovery",
    description: "Plan for database and application recovery.",
    color: "from-green-700 to-green-400",
  },
  {
    icon: RefreshCw,
    title: "Backup & Restore",
    description: "Automate backups and restore your database with confidence.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileText,
    title: "Testing & Documentation",
    description: "Test recovery, document procedures, and keep contacts updated.",
    color: "from-yellow-400 to-orange-500",
  },
]

const fullContent = (
  <>
    <h3 className="text-2xl font-bold text-gray-900 mb-3">Disaster Recovery Plan</h3>
    <div className="prose max-w-none">
      <h4 id="overview">Overview</h4>
      <p>This document outlines the steps to recover the database and application in case of a disaster. It includes backup procedures, recovery steps, and testing recommendations.</p>
      <h4 id="backup-strategy">Backup Strategy</h4>
      <h5>Database Backups</h5>
      <ul>
        <li><strong>Backup Script:</strong> Use the <code>backup.sh</code> script located in the <code>scripts</code> directory to create regular backups of the Supabase database.</li>
        <li><strong>Backup Frequency:</strong> Run the backup script daily or as needed.</li>
        <li><strong>Backup Location:</strong> Store backups in the <code>./backups</code> directory. Consider using a cloud storage service (e.g., S3, Google Cloud Storage) for additional security.</li>
      </ul>
      <h5>Backup Script Usage</h5>
      <ol className="list-decimal pl-6">
        <li>Navigate to the project root directory.</li>
        <li>Run the backup script:</li>
      </ol>
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`./scripts/backup.sh`}</code></pre>
      <ol className="list-decimal pl-6" start={3}>
        <li>Verify the backup file is created in the <code>./backups</code> directory.</li>
      </ol>
      <h4 id="recovery-process">Recovery Process</h4>
      <h5>Restore Database</h5>
      <ol className="list-decimal pl-6">
        <li><strong>Locate the Latest Backup:</strong> Identify the most recent backup file in the <code>./backups</code> directory.</li>
        <li><strong>Restore the Database:</strong></li>
      </ol>
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`pg_restore -h your_database_host -U your_database_user -d your_database_name -f ./backups/backup_YYYYMMDD_HHMMSS.sql`}</code></pre>
      <ol className="list-decimal pl-6" start={3}>
        <li><strong>Verify Restoration:</strong> Check the database to ensure all tables and data are restored correctly.</li>
      </ol>
      <h5>Run Migrations</h5>
      <ol className="list-decimal pl-6">
        <li><strong>Apply Migrations:</strong> Run the migration scripts to ensure the database schema is up-to-date:</li>
      </ol>
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`npx supabase db reset`}</code></pre>
      <ol className="list-decimal pl-6" start={2}>
        <li><strong>Verify Migrations:</strong> Check the database to ensure all migrations are applied successfully.</li>
      </ol>
      <h4 id="testing">Testing</h4>
      <ul>
        <li><strong>Disaster Recovery Drill:</strong> Periodically test the recovery process in a staging environment to ensure it works as expected.</li>
        <li><strong>Automated Testing:</strong> Consider adding automated tests for your migrations to catch issues early.</li>
      </ul>
      <h4 id="documentation">Documentation</h4>
      <ul>
        <li><strong>Environment Variables:</strong> Ensure all sensitive configuration (e.g., Cloudinary API keys) is documented and stored securely.</li>
        <li><strong>Recovery Plan:</strong> Keep this document updated with any changes to the backup or recovery process.</li>
      </ul>
      <h4 id="contact-information">Contact Information</h4>
      <ul>
        <li><strong>Database Administrator:</strong> [Name and Contact Information]</li>
        <li><strong>Application Developer:</strong> [Name and Contact Information]</li>
      </ul>
      <hr className="my-6" />
      <p className="text-sm text-gray-500">This plan should be reviewed and updated regularly to ensure it remains effective and aligned with the current infrastructure and requirements.</p>
    </div>
  </>
)

export function DisasterRecoveryPlanSection() {
  const ref = useRef(null)
  const [showFullContent, setShowFullContent] = useState(false)

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Disaster Recovery Plan</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Disaster recovery plan for database and application.
          </p>
        </motion.div>
        <AnimatePresence mode="wait">
          {!showFullContent ? (
            <motion.div
              key="highlights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            >
              {introHighlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
                >
                  <Card className="h-full flex flex-col items-center text-center p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardHeader className="pb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="full-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="space-y-12"
            >
              {fullContent}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-green-700 border-green-700 hover:bg-green-50"
          >
            {showFullContent ? (
              <>
                Show Less <ArrowUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Show More <ArrowDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  )
} 