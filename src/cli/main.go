package main

import (
    "fmt"
    
    "github.com/spf13/cobra"
)

func main() {

    var cmdVersion = &cobra.Command{
        Use:   "version",
        Short: "Print the current version of the jenca CLI",
        Run: func(cmd *cobra.Command, args []string) {
            fmt.Println("Print the version here")
        },
    }

    var rootCmd = &cobra.Command{Use: "jenca"}
    rootCmd.AddCommand(cmdVersion)
    rootCmd.Execute()
}