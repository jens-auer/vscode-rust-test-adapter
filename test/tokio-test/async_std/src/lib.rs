#[cfg(test)]
pub mod async_std_tests {
    use async_std;

    #[async_std::test]
    async fn my_test() -> std::io::Result<()> {
        assert_eq!(2 * 2, 4);
    Ok(())
    }
}