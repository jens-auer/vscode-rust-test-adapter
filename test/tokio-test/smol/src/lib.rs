#[cfg(test)]
mod smol_tests {
    use smol_potat;

    #[smol_potat::test]
    async fn my_test() -> std::io::Result<()> {
        assert_eq!(2 * 2, 4);
        Ok(())
    }
}